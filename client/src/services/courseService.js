import { API_BASE } from "../config/api";
import { getToken } from "../utils/auth";


export const createCourse = async (course)=>{
    const res = await fetch(`${API_BASE}/courses`, {
        method:"POST", 
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body:JSON.stringify(course),
    });

    if(!res.ok){
        throw new Error("Failed to create course");
    }
    return res.json();
};



export const getPublishedCourses = async()=>{
    const res = await fetch(`${API_BASE}/courses`,{
        headers:{
            Authorization:`Bearer ${getToken()}`,
        },
    });

    if(!res.ok){
        throw new Error("Failed to fetch courses");
    }
    return res.json();
};


export const getMyCourses = async () => {
  const res = await fetch(`${API_BASE}/courses/mine`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch instructor courses");
  }

  return res.json();
};


export const updateCourse = async(id, updates)=>{
    const res = await fetch(`${API_BASE}/courses/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${getToken()}`,
        },
        body: JSON.stringify(updates),
    })

    if(!res.ok){
        throw new Error("Failed to update course");
    }
    return res.json();

};