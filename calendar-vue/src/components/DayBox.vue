<script>
import {DayMapping, MonthMapping} from "@/constants/dates.js";
import {getMonth, getWeekOfMonth, getYear} from "date-fns";

export default {
  name: "DayBox",
  props: {
    selectedMonth: Number,
    selectedYear: Number,
    day: Date
  },
  methods: {
    getDescriptiveDay(day) {
      return DayMapping[day]
    },
    showDayText(day) {
      return (getWeekOfMonth(day) == 1 && getMonth(day) == this.selectedMonth && getYear(day) == this.selectedYear) || day < new Date(this.selectedYear, this.selectedMonth, 1)
    },
    getMonthText(day) {
      const month = this.getMonth(day)
      return MonthMapping[month]
    },
    getMonth(day) {
      return getMonth(day)
    }
  }
}
</script>

<template>
  <div class="border-[0.5px] border-gray-200 flex justify-center">
    <div class="flex flex-col gap-1 mt-2">
      <p v-if="showDayText(day)">
        {{ getDescriptiveDay(day.getDay()) }}
      </p>
      <div class="flex font-bold justify-center w-full">
        <div v-if="day.getDate() === 1">
          {{ getMonthText(day) }}
        </div>
        <div class="ml-1">
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>