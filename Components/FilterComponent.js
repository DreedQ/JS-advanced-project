Vue.component('filters', {
    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter(filterValue)">
        <input type="text" class="search-field" v-model="filterValue">
        <button class="btn-search" type="submit">
        <i class="fas fa-search" ></i></button>
                </form>`
});
// По этому коду есть вопрос. В текущем варианте работатет ищет-находит, при удалении запроса всё возвращается, но в консоль даёт предупреждение по "filterValue" как неопределённый метод.
// По решению  от разработчиков тоже ищет-находит, но при стирании не возвращает весь каталог. я где-то недопонял. Эксперименты не помогли.
// <form action="#" class="search-form" @submit.prevent="$parent.filter">
//     <input type="text" class="search-field" v-model="$parent.filterValue">
//     <button class="btn-search" type="submit">
//     <i class="fas fa-search" ></i></button>
// </form>