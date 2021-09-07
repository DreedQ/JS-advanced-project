Vue.component('err', {
    props: ['visibility'],
    template: `<div class="err-el" v-show="visibility">
    Ошибка доступа к серверу
   </div>`
});