// ==============================
// DU3 + DU4 – Zaměstnanci firmy
// ==============================

// ---------- DATA ----------
const maleNames = ["Jan", "Petr", "Jiří", "Josef", "Václav", "Martin", "Tomáš", "Miroslav", "Jaroslav", "František", "Zdeněk", "Milan", "Karel", "Daniel", "Lukáš", "Ondřej", "Radek", "Filip", "Stanislav", "Aleš", "David", "Jindřich", "Matěj", "Pavel", "Štěpán"];
const femaleNames = ["Jana", "Eva", "Hana", "Anna", "Marie", "Tereza", "Petra", "Lenka", "Alena", "Lucie", "Martina", "Michaela", "Veronika", "Eliška", "Barbora", "Kateřina", "Ivana", "Dana", "Helena", "Zuzana", "Šárka", "Simona", "Renata", "Kristýna", "Markéta"];

const maleSurnames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Pokorný", "Marek", "Pospíšil", "Hájek", "Král", "Jelínek", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman", "Kolář", "Navrátil", "Čermák"];
const femaleSurnames = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová", "Pokorná", "Marková", "Pospíšilová", "Hájeková", "Králová", "Jelíková", "Růžičková", "Benešová", "Fialová", "Sedláčková", "Doležalová", "Zemanová", "Kolářová", "Navrátilová", "Čermáková"];

// ---------- POMOCNÉ FUNKCE ----------
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateWorkload() {
    const workloads = [10, 20, 30, 40];
    return getRandomElement(workloads);
}

function generateBirthdate(minAge, maxAge) {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - minAge);

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxAge);

    const randomTimestamp =
        minDate.getTime() +
        Math.random() * (maxDate.getTime() - minDate.getTime());

    return new Date(randomTimestamp).toISOString();
}

function getAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
            today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
}

function average(arr) {
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
}

function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    return sorted.length % 2 === 0
        ? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
        : sorted[middle];
}

// ---------- GENEROVÁNÍ ZAMĚSTNANCŮ ----------
function generateEmployeeData(dtoIn) {
    const employees = [];

    for (let i = 0; i < dtoIn.count; i++) {
        const isMale = Math.random() > 0.5;

        employees.push({
            gender: isMale ? "male" : "female",
            birthdate: generateBirthdate(dtoIn.age.min, dtoIn.age.max),
            name: isMale ? getRandomElement(maleNames) : getRandomElement(femaleNames),
            surname: isMale ? getRandomElement(maleSurnames) : getRandomElement(femaleSurnames),
            workload: generateWorkload()
        });
    }

    return employees;
}

// ---------- STATISTIKY ----------
function getEmployeeStatistics(employees) {
    const total = employees.length;

    let workload10 = 0;
    let workload20 = 0;
    let workload30 = 0;
    let workload40 = 0;

    const ages = [];
    const workloads = [];
    const womenWorkloads = [];

    employees.forEach(emp => {
        const age = getAge(emp.birthdate);
        ages.push(age);
        workloads.push(emp.workload);

        if (emp.workload === 10) workload10++;
        if (emp.workload === 20) workload20++;
        if (emp.workload === 30) workload30++;
        if (emp.workload === 40) workload40++;

        if (emp.gender === "female") {
            womenWorkloads.push(emp.workload);
        }
    });

    const sortedByWorkload = [...employees].sort(
        (a, b) => a.workload - b.workload
    );

    return {
        total,
        workload10,
        workload20,
        workload30,
        workload40,
        averageAge: roundToOneDecimal(average(ages)),
        minAge: Math.min(...ages),
        maxAge: Math.max(...ages),
        medianAge: median(ages),
        medianWorkload: median(workloads),
        averageWomenWorkload: womenWorkloads.length
            ? Math.round(average(womenWorkloads))
            : 0,
        sortedByWorkload
    };
}

// ---------- MAIN ----------
function main(dtoIn) {
    const employees = generateEmployeeData(dtoIn);
    return getEmployeeStatistics(employees);
}

// ---------- TEST ----------
/*
const dtoIn = {
    count: 50,
    age: {
        min: 19,
        max: 35
    }
};

console.log(main(dtoIn));
*/