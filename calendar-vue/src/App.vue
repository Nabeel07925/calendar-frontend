<script setup>
import {RouterLink, RouterView} from 'vue-router'
import lessThanIcon from "./assets/less-than-solid.svg";
import greaterThanIcon from "./assets/greater-than-solid.svg";
import searchIcon from "./assets/search.png";
import questionIcon from "./assets/question-icon.svg";
import settingsIcon from "./assets/setting-icon.svg";
import calendarIcon from "./assets/calendar-icon.png";
</script>

<template>
  <div class="h-[100vh]">
<!--&lt;!&ndash;    <header>&ndash;&gt;-->
<!--      <div class="m-4 left-0 top-0 w-full">-->
<!--        <div class="flex items-center justify-evenly w-full">-->
<!--          <h1 class="text-2xl">-->
<!--            Calendar-->
<!--          </h1>-->
<!--          <p class="border-gray-300 text-sm border-[1px] px-3 py-2 rounded">-->
<!--            Today-->
<!--          </p>-->
<!--          <img :src="lessThanIcon" alt="<" width="15px"/>-->
<!--          <img :src="greaterThanIcon" alt="<" width="15px"/>-->
<!--          <img :src="searchIcon" alt="<" width="15px"/>-->
<!--          <img :src="questionIcon" alt="?" width="15px"/>-->
<!--          <img :src="settingsIcon" alt="setting" width="15px"/>-->
<!--          <img :src="calendarIcon" alt="setting" width="15px"/>-->
<!--        </div>-->

<!--      </div>-->
<!--    </header>-->

    <RouterView/>
  </div>
</template>
