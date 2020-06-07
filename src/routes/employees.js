const express = require('express');
const router = express.Router();

const mysqlConecction = require('../db');

router.get('/', (req,res) => {
    mysqlConecction.query('SELECT * FROM employee;', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req,res) => {
    const {id} = req.params;
    mysqlConecction.query('SELECT * FROM employee WHERE id = ?', [id], (err,rows,fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/', (req,res) =>{
    const { id, name, salary } = req.body;
    mysqlConecction.query('INSERT INTO employee VALUES (?,?,?);',[id, name, salary], (err,rows,fields) =>{
        if(!err) {
            res.json({Status: 'Employee Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req,res) =>{
    const {name, salary} = req.body;
    const {id} = req.params;
    mysqlConecction.query('UPDATE employee SET name="?", salary="?" WHERE id=?;',[name,salary,id], (err,rows,fields) =>{
        if(!err) {
            res.json({Status: 'Employee Updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    mysqlConecction.query('DELETE FROM employee WHERE id=?;',[id], (err,rows,fields) =>{
        if(!err) {
            res.json({Status: 'Employee Deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;