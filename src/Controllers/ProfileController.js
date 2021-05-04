const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();
    res.render("profile", { profile });
  },

  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body;
    // definir quantas semanas tem no ano: 52
    const weeksPerYear = 52;
    // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    // quantas horas por semana estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    // total de horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    // qual será o valor da minha hora?
    const valuePerHour = data["monthly-budget"] / monthlyTotalHours;

    // atualizando valores do Profile no database
    const profile = await Profile.get();
    await Profile.update({
      ...profile,
      ...req.body,
      "value-per-hour": valuePerHour,
    });
    
    // redirecionando para a mesma rota
    return res.redirect("/profile");
  },
};
