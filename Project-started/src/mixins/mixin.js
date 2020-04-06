import axiosDb from "@/services/axios-db";
export default {
  data: function() {
    return {
      food: []
    };
  },
  methods: {
    async getData() {
      try {
        const res = await axiosDb.get(`foods.json`);
        const allFoods = res.data;
        for (const foodId of allFoods) {
          this.food.put({
            foodId,
            ...allFoods[foodId]
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
