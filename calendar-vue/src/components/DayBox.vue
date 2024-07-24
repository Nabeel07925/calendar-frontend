<script>
import {DayMapping, MonthMapping} from "@/constants/dates.js";
import {getMonth, getWeekOfMonth, getYear} from "date-fns";
import DatesMixin from "@/mixins/DatesMixin.vue";

export default {
  name: "DayBox",
  props: {
    selectedMonth: Number,
    selectedYear: Number,
    day: Date,
    daySchedules: Array
  },
  mixins: [DatesMixin],
  methods: {
    showDayText(day) {
      return (getWeekOfMonth(day) == 1 && getMonth(day) == this.selectedMonth && getYear(day) == this.selectedYear) || day < new Date(this.selectedYear, this.selectedMonth, 1)
    },
    getMonthText(day) {
      const month = getMonth(day)
      return this.getDescriptiveMonth(month)
    }
  }
}
</script>

<template>
  <div class="border-[0.5px] border-gray-200 flex justify-center">
    <div class="flex flex-col items-center gap-1 mt-2 w-full">
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
      <div class="h-full flex flex-col gap-[0.8px] w-full">
        <div v-for="schedule in daySchedules" class="flex w-full bg-green-700 rounded text-white text-xs">
          <span class="ml-2">
            {{ schedule.startTime }} {{schedule.meetingTitle}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>