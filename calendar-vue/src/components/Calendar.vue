<script>
import {
  startOfWeek,
  addDays, addMonths, addYears, subYears, subMonths,
} from 'date-fns';
import DayBox from "@/components/DayBox.vue";
import NewSchedule from "@/components/NewSchedule.vue";
import {api} from "@/services/api.js";
import {schedule} from "@/constants/api_endpoints.js";
import SchedulesMixin from "@/mixins/SchedulesMixin.vue";
import CalendarHeader from "@/components/CalendarHeader.vue";

export default {
  name: "CalendarControl",
  components: {
    DayBox,
    NewSchedule,
    CalendarHeader
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
  events: ['scheduleAdded'],
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
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const dayOfMonth = formattedDate.getDate().toString().padStart(2, '0');

      this.clickedDate = `${year}-${month}-${dayOfMonth}`;
      popup.openPopup(event.clientX, event.clientY, day);
    },
    async getSchedules() {
      try {
        const schedulesResponse = await api.get(schedule)
        this.schedules = this.formatSchedules(schedulesResponse.data)
      } catch (err) {
        console.log("error occured: ", err)
      }
    },
    changeMonth(forward) {
      let newDate = null
      const dateOfSelectedMonth = new Date(this.selectedYear, this.selectedMonth, 1)

      if (forward) {
        newDate = addMonths(dateOfSelectedMonth, 1)
      }
      else {
        newDate = subMonths(dateOfSelectedMonth, 1)
      }
      this.selectedMonth = newDate.getMonth()
      this.selectedYear = newDate.getFullYear()
      this.generateCalendar()
      console.log("slected month and year ", this.selectedMonth, this.selectedYear)
    },
  }
}
</script>

<template>
  <!--  <div>-->
  <div class="w-full h-full text-xs text-gray-600">
    <calendar-header
        :selected-month="selectedMonth"
        :selectedYear="selectedYear"
        @change-month="changeMonth"
    />
    <div class="grid grid-cols-7 h-full mx-3">
      <day-box
          @click="showPopup($event, day)"
          :selected-month="selectedMonth" :selected-year="selectedYear" :day="day"
          :key="day"
          :day-schedules="getFilteredSchedulesInDate(day, schedules)"
          v-for="day in days">
      </day-box>
    </div>
    <new-schedule ref="schedulePopup"
                  @scheduleAdded="getSchedules"
                  :date="clickedDate"
    />
  </div>
</template>

<style scoped>

</style>