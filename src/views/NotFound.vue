<template>
  <div>
    <h1>Not found</h1>
    <p>
      Ops! Can't find this... Go to
      <router-link :to="{ name: 'Home' }">home</router-link>
    </p>
  </div>
</template>
