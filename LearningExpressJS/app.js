// Imports --------------------------------------------
import express from "express";
import database from "./database.js";
// Configure express app -------------------------------
const app = new express();

// Configure middleware -------------------------------


// Controllers ----------------------------------------
const clinicsController = async (req, res) => {
    // Initialisations
    let table = "Clinics";
    let fields = [
        "ClinicID",
        "ClinicName",
        "ClinicAddress",
        "ClinicPostcode",
        "ClinicContact",
        "ClinicManagerID",
    ];
    // Resolve foreign keys
    table = `${table} LEFT JOIN Staff ON ClinicManagerID = StaffID`;
    fields = [
        ...fields,
        "CONCAT(StaffFirstname, ' ', StaffLastname) AS ClinicManagerName"
    ];

    // Build and execute query
    const sql = `SELECT ${fields} FROM ${table}`;

    try {
        const [result] = await database.query(sql);

        if (result.length === 0) {
            res.status(404).json({ message: "No record(s) found" });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: `Failed to execute query: ${error.message}` });
    }
};


// Endpoints -------------------------------------------
app.get("/api/clinics", clinicsController);

// Start server ----------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});