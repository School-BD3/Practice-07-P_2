// СИСТЕМА УПРАВЛІННЯ СТУДЕНТАМИ

const readline = require("readline");

let students = [];
let nextId = 1;

// ДОДАВАННЯ СТУДЕНТА

const addStudent = (name, age, grade, faculty) => {
  if (!name || age <= 0 || grade < 0 || grade > 100) {
    console.log("Некоректні дані");
    return;
  }

  const student = {
    id: nextId++,
    name,
    age,
    grade,
    faculty
  };

  students.push(student);
  console.log("Студента додано");
};

// ФІЛЬТРАЦІЯ

const filterStudents = ({ age, grade, faculty }) => {
  if (students.length === 0) {
    console.log("Список порожній");
    return [];
  }

  return students.filter(s => {
    return (
      (age ? s.age === age : true) &&
      (grade ? s.grade >= grade : true) &&
      (faculty ? s.faculty === faculty : true)
    );
  });
};

// СОРТУВАННЯ

const sortStudents = (key, asc = true) => {
  if (students.length === 0) {
    console.log("Список порожній");
    return [];
  }

  return [...students].sort((a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1;
    if (a[key] > b[key]) return asc ? 1 : -1;
    return 0;
  });
};

// СТАТИСТИКА

const getStats = () => {
  if (students.length === 0) {
    console.log("Список порожній");
    return;
  }

  const avgGrade =
    students.reduce((sum, s) => sum + s.grade, 0) / students.length;

  const bestStudent = students.reduce((best, current) =>
    current.grade > best.grade ? current : best
  );

  const facultyStats = students.reduce((acc, s) => {
    acc[s.faculty] = (acc[s.faculty] || 0) + 1;
    return acc;
  }, {});

  console.log("Статистика:");
  console.log("Середній бал:", avgGrade.toFixed(2));
  console.log("Найкращий студент:", bestStudent);
  console.log("Розподіл за факультетами:", facultyStats);
};

// ПОШУК

const findStudentByName = (name) => {
  const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());

  if (!student) {
    console.log("Студента не знайдено");
    return;
  }

  console.log("Знайдено:", student);
};

// МЕНЮ

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = () => {
  console.log(`
1. Додати студента
2. Показати всіх студентів
3. Фільтрація
4. Сортування
5. Статистика
6. Пошук за ім'ям
0. Вихід
`);

  rl.question("Ваш вибір: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Ім'я: ", name => {
          rl.question("Вік: ", age => {
            rl.question("Середній бал: ", grade => {
              rl.question("Факультет: ", faculty => {
                addStudent(name, +age, +grade, faculty);
                menu();
              });
            });
          });
        });
        break;

      case "2":
        console.log(students);
        menu();
        break;

      case "3":
        rl.question("Вік (або Enter): ", age => {
          rl.question("Мін. бал (або Enter): ", grade => {
            rl.question("Факультет (або Enter): ", faculty => {
              console.log(
                filterStudents({
                  age: age ? +age : null,
                  grade: grade ? +grade : null,
                  faculty: faculty || null
                })
              );
              menu();
            });
          });
        });
        break;

      case "4":
        rl.question("Поле (name/age/grade): ", key => {
          rl.question("Порядок (asc/desc): ", order => {
            console.log(sortStudents(key, order === "asc"));
            menu();
          });
        });
        break;

      case "5":
        getStats();
        menu();
        break;

      case "6":
        rl.question("Введіть ім'я: ", name => {
          findStudentByName(name);
          menu();
        });
        break;

      case "0":
        rl.close();
        break;

      default:
        console.log("Невірний вибір");
        menu();
    }
  });
};

menu();
