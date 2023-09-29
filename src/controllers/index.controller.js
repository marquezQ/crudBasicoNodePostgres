const { Pool } = require('pg'); 

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'firstapi',
    port: '5432'
})

const getUsers = async (req, res)=>{
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}
const getUserById = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(response.rows);
}

const createUser = async (req, res) => {
    const {name, email} = req.body;

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)',[name, email]);
    console.log(response); 
    res.json( {
        message: 'user add succesfully',
        body:{
            user:{name, email}
        }
    })
    
};

const deteleUser = async (req, res) => {
     
    const id = req.params.id;
    const response = await pool.query(`DELETE FROM users WHERE id = ${id}`);
    console.log(response);
    res.json(`User ${id} deleted successfully`);

}
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {name , email} = req.body;
    //en update no me funciona el `` ${variable}
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id= $3' ,[
    name,
    email,
    id
    ]);
    
    console.log(response);
    res.json('user updated successfully '); 
}

module.exports = {getUsers, getUserById, createUser, deteleUser, updateUser}