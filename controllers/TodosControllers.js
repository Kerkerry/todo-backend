import Connection from "../models/db_connection.js"

const AddTodo=(req,res)=>{        
        const {taskName,description, priority,isCompleted,dueDate, category,tags}=req.body;
        // const taskName="Flutter State Management"
        // const description="Learn how to use bloc in flutter to manage state management"
        // const isCompleted=false;
        // const dueDate="2025-09-22"
        // const priority="Medium"
        // const category="Learning"
        // const tags=`["Programming","Project","Leisure","Hobby"]`
        Connection.query(
            `INSERT INTO todos (id, task_name, description, is_completed, due_date, priority, category, tags) 
            VALUES(?,?,?,?,?,?,?,?);`,
            [String(Date.now()),taskName,description,isCompleted,dueDate,priority,category,JSON.stringify(tags)],
            (error,result)=>{
                if(error){
                    console.error(`Error occured while creating a task: ${error}`);
                }else{
                    console.log(`Successfully created the task: ${result}`);
                }
            }
        )
}

const toggleTodo=(req,res)=>{
    const {id}=req.params;
    const {is_completed}=JSON.parse(req.body.todo);
    Connection.query(
        `UPDATE todos SET is_completed=? WHERE id=?`,
        [!is_completed,id],
        (error,result)=>{
            if(error){
                console.error(`Error changing is_completed field of todo ${id}: ${error}`);
            }else{
                console.log(`Successfully updated is_completed field for todo ${id}: ${result}`);
            }
        }
    )
}

const deleteTodo=(req,res)=>{
    const {id}=req.params
    Connection.query(
        `DELETE FROM todos WHERE id=?`,
        [id],
        (error,result)=>{
            if(error){
                console.error(`Error deleting todo with id ${id}: ${error}`);
            }else{
                console.log(`Succefuly deleted todo ${id}`);
            }
        }
    )
}

const getTodos=(req,res)=>{
    Connection.query(
        `SELECT * FROM todos`,
        (error,result)=>{
            if(error){
                console.error(`Error getting todos: ${error}`);
            }else{
                const todos=result.map(row=>{
                    return {
                        ...row,
                        tags:row.tags?JSON.parse(row.tags):[],
                        is_completed:!!row.is_completed
                    }
                })

                res.json(todos)
            }
        }
    )
}

const updateTodo=(req,res)=>{
    const {id}=req.params;
    const {taskName,description, priority,isCompleted,dueDate,category,tags}=req.body;
    // const taskName="Call client John"
    // const id='1722605786002'
    // const description="Ask wether the item ordered was delivered successfully"
    // const isCompleted=false;
    // const dueDate="2025-08-14"
    // const priority="Low"
    // const category="Work"
    // const tags=`["Communication", "Order"]`
      // Build the SET clause dynamically based on what's provided in the request body
    // This allows partial updates (e.g., just toggle is_completed)
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


