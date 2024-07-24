<script>
import {
  startOfWeek,
  addDays,
} from 'date-fns';
import DayBox from "@/components/DayBox.vue";
import NewSchedule from "@/components/NewSchedule.vue";
import {api} from "@/services/api.js";
import {schedule} from "@/constants/api_endpoints.js";
import SchedulesMixin from "@/mixins/SchedulesMixin.vue";
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
      days: [],
      schedules: []
    }
  },
  async created() {
    this.generateCalendar()
    await this.getSchedules()
  },
  mixins: [SchedulesMixin],
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
      const popup = this.$refs.schedulePopup;
      const formattedDate = new Date(day)
      this.clickedDate = formattedDate.toISOString().slice(0, 10);
      popup.openPopup(event.clientX, event.clientY, day);
    },
    async getSchedules() {
      try {
        const schedulesResponse = await api.get(schedule)
        this.schedules = this.formatSchedules(schedulesResponse.data)
      }
      catch (err) {
        console.log("error occured: ", err)
      }
    },
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
          :day-schedules="getFilteredSchedulesInDate(day, schedules)"
          v-for="day in days">
      </day-box>
    </div>
    <new-schedule ref="schedulePopup" :date="clickedDate" @save-event="addEvent"/>
  </div>
</template>

<style scoped>

</style>