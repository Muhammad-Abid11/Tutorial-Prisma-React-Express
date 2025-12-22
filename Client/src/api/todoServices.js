import API from "./index";

export const getTodos = async () => {
    const response = await API.get("/todos");
    return response.data;
};

export const createTodo = async (title) => {
    const response = await API.post("/todos", { title });
    return response.data;
};

export const updateTodo = async (id, updates) => {
    const response = await API.put(`/todos/${id}`, updates);
    return response.data;
};

export const deleteTodo = async (id) => {
    const response = await API.delete(`/todos/${id}`);
    return response.data;
};
