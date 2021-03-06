const Database = require("./config");

const Db = {
    async init() {
        const db = await Database();

        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            hours_per_day INT,
            days_per_week INT,
            vacation_per_year INT,
            value_per_hour INT
        )`);

        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            hours_per_day,
            days_per_week,
            vacation_per_year,
            value_per_hour
        ) VALUES (
            "Igor",
            "https://github.com/igorfig.png",
            5000,
            8,
            5,
            4,
            70
        )
        `);

        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            4,
            1,
            1619447589480
        )`);

        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Project",
            3,
            47,
            1619447589480
        )
        `);

        await db.close();
    }
}

Db.init()