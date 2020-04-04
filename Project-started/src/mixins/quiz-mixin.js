import axiosDb from "@/services/axios-db";
import data from "../../public/Health-questions.json";
export default {
  data: function() {
    return {
      quiz: []
    };
  },
  methods: {
    async getQuiz() {
      try {
        const res = await axiosDb.get(
          `http://localhost:8080/health/${data}`
        );
        const allQuestions = res.data;
        for (const id of allQuestions) {
          this.quiz.push(id, ...allQuestions[id]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
