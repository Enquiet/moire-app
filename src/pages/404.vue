<template>
  <div class="error-page">
    <div class="error-page__message">
      <h1 class="error-page__title">404</h1>
      <p class="error-page__sub">Такой страницы не существует</p>
      <router-link class="error-page__btn"  :to="{name:'main'}">
        Перейти на главную страницу
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss">
  .error-page{
    background: url('../../public/img/404/404.gif') no-repeat;
    width: 100%;
    height: 700px;
    background-size: cover;
    &__title{
      font-size: 164px;
      color: #fff;
      text-align: center;
      font-weight: 400;
    }
    &__sub{
      font-size: 60px;
      color: #fff;
      text-align: center;
    }
    &__btn{
      display: block;
      margin: 0 auto;
      border: 1px solid #fff;
      color: #fff;
      background: transparent;
      border-radius: 5px;
      text-align: center;
      max-width: 300px;
      padding: 15px 0;
       transition: .3s;
       position: relative;
       z-index: 555;
      &:hover{
        background: #fff;
        color: #e02d71;
        transition: .3s;
      }
    }

  }
</style>
