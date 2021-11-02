<template>
  <div class="container">
    <nav class="app-nav">
      <router-link :to="{name: 'Main'}" class="link">Главная</router-link>
      <router-link :to="{name: 'Converter'}" class="link">Конвертер</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in"> 
        <component :is="Component" />
      </transition> 
    </router-view> 
  </div>
</template>

<style>

  *, 
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
      background-color: lightblue;
      padding-top: 30px;
  }

  .container {
      width: 100%;
      max-width: 1230px;
      padding: 0 15px;
      background:  lightblue;
      margin: 0 auto;
  }

  .route-enter-from {
    opacity: 0;
    transform: translateX(100px);
  }

  .route-enter-active {
    transition: all 0.4s ease-out;
  }

  .route-leave-to {
    opacity: 0;
    transform:  translateX(-100px);
  }

  .route-leave-active {
    transition: all 0.4s ease-out;
  }

  .link {
      text-transform: uppercase;
      font-size: 20px;
      color: #020202;
      margin-right: 15px;
      text-decoration: none;
  }

</style>
