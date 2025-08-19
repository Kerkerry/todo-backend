import Connection from "../models/db_connection.js";
const AddTodo=(req,res)=>{  
        const {userid}=req.auth;
        const {task_name,description, priority,is_completed,due_date, category,tags}=req.body;
        Connection.query(
            `INSERT INTO todos (id,user_id,task_name, description, is_completed, due_date, priority, category, tags) 
            VALUES(?,?,?,?,?,?,?,?,?);`,
            [String(Date.now()),userid,task_name,description,is_completed,due_date,priority,category,JSON.stringify(tags)],
            (error,result)=>{
                if(error){
                    console.error(error);
                    res.status(500).json(`Error occured while creating task: ${error}`)
                }else{
                    console.log(result);
                    res.status(201).json(result)
                }
            }
        )
}

const toggleTodo=(req,res)=>{
    const {id,user_id,is_completed}=req.body[0]

    Connection.query(
        `UPDATE todos SET is_completed=? WHERE id=? AND user_id=?`,
        [!is_completed,id,user_id],
        (error,result)=>{
            if(error){
                res.status(500).json({message:'An error occured'})
            }else{
                res.status(200).json({message:'Toggled successfuly'})
            }
        }
    )
}

const deleteTodo=(req,res)=>{
    const {id}=req.params;
    const {userid}=req.auth;
    const sql=`DELETE FROM todos WHERE id=? AND user_id=?`;
    Connection.query(
        sql,
        [id,userid],
        (error,result)=>{
            if(error){
                res.status(500).json(error)
            }else{
                res.status(204)
            }
        }
    )
    
    
}

const getTodos=(req,res)=>{
    const userId=req.auth.userid;    
    Connection.query(
        `SELECT * FROM todos WHERE user_id=?`,
        [userId],
        (error,result)=>{
            if(error){
                res.status(500).json(error)
                console.error(`Error getting todos: ${error}`);
            }else{
                const todos=result.map(row=>{
                    return {
                        ...row,
                        tags:row.tags?JSON.parse(row.tags):[],
                        is_completed:!!row.is_completed
                    }
                })
                res.status(200).json({user:req.auth,todos:todos})
            }
        }
    )
    return;
}


const updateTodo=(req,res)=>{
    const userId=req.auth.userid;
    const {id}=req.params;
    const {task_name,description, priority,is_completed,due_date,category,tags}=req.body;
    const updates = [];
    const params = [];

    if (is_completed !== undefined) {
        updates.push('is_completed = ?');
        params.push(isCompleted ? 1 : 0); // Convert boolean to 0 or 1
    }
    if (task_name !== undefined) {
        updates.push('task_name = ?');
        params.push(taskName);
    }
    if (description !== undefined) {
        updates.push('description = ?');
        params.push(description);
    }
    if (due_date !== undefined) {
        updates.push('due_date = ?');
        params.push(dueDate);
    }
    if (priority !== undefined) {
        updates.push('priority = ?');
        params.push(priority);
    }
    if (category !== undefined) {
        updates.push('category = ?');
        params.push(category);
    }
    if (tags !== undefined) {
        updates.push('tags = ?');
        params.push(JSON.stringify(tags)); // Stringify for JSON column
    }

    if (updates.length === 0) {
        return res.status(400).json({ message: 'No fields provided for update.' });
    }

    const sql = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?;`;
    params.push(id);

    Connection.query(
        // `
        //     UPDATE todos SET task_name=?,description=?,priority=?,is_completed=?,due_date=?,category=?,tags=? WHERE id=?
        // `,
        // [taskName,description,priority,isCompleted,dueDate,category,`${tags}`,id],
        sql,
        params,
        (error,result)=>{
            if(error){
                console.error(`Error updating todo with id ${id}: ${error}`);
            }else{
                console.log(`Succefuly updated todo ${id}: ${result}`);
                
            }
        }
    )
}

export default {getTodos,AddTodo,deleteTodo,updateTodo,toggleTodo}


