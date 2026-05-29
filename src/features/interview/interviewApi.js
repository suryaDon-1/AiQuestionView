import api from "../../utils/api.js"

// create interview questions
const createInterview = async(data)=>{
    const res = await api.post("/interview/create", data);
    return res.data
}
// submit answer
const submitAnswer = async(data, interviewId)=>{
    const res = await api.post(`/interview/submitans/${interviewId}`,data);
    return res.data
}
// history 
const history = async()=>{
    const res = await api.get("/interview/history");
    return res.data;
}
// single
const single = async(interviewId)=>{
    const res = await api.get(`/interview/single/${interviewId}`);
    return res.data;
}
const deleteInterview = async (data) => {
  const response = await api.delete(
    "/interview/delete",
    {
      data,
    }
  );

  return response.data;
};
const interviewService = {
    createInterview,
    submitAnswer,
    history,
    single,
    deleteInterview
}
export default interviewService;