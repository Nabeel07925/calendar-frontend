<script>
import {
  startOfWeek,
  addDays,
} from 'date-fns';
import DayBox from "@/components/DayBox.vue";
import NewSchedule from "@/components/NewSchedule.vue";

export default {
  name: "CalendarControl",
  components: {
    DayBox,
    NewSchedule
  },
  data() {
    return {
      currentDate: new Date(),
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      clickedDate: null,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      days: []
    }
  },
  created() {
    this.generateCalendar()
  },
  methods: {
    generateCalendar() {
      this.days = [];
      const start = startOfWeek(new Date(this.selectedYear, this.selectedMonth, 1));
      const end = addDays(new Date(start), 34)
      let day = start;
      while (day <= end) {
        this.days.push(day);
        day = addDays(day, 1);
      }
    },
    showPopup(event, day) {
      console.log("event is ", day)
      const popup = this.$refs.schedulePopup;
      const formattedDate = new Date(day)
      this.clickedDate = formattedDate.toISOString().slice(0, 10);
      // const rect = event.target.getBoundingClientRect();
      popup.openPopup(event.clientX, event.clientY, day);
    }
  }
}
</script>

<template>
  <!--  <div>-->
  <div class="w-full h-full text-xs text-gray-600">
    <div class="grid grid-cols-7 h-full mx-3">
      <day-box
          @click="showPopup($event, day)"
          :selected-month="selectedMonth" :selected-year="selectedYear" :day="day"
          :key="day"
          v-for="day in days">
      </day-box>
    </div>
    <new-schedule ref="schedulePopup" :date="clickedDate" @save-event="addEvent"/>
  </div>
</template>

<style scoped>

</style>