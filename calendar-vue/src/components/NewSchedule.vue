<script>
import crossIcon from "@/assets/close-116-64.png";
import clock from "../assets/clock.png";
import axios from "axios";
import {BASE_URL, meeting, schedule} from "@/constants/api_endpoints.js";
import {api} from "@/services/api.js";

export default {
  name: "NewSchedule",
  data() {
    return {
      visible: false,
      position: {
        top: 0,
        left: 0
      },
      title: '',
      description: '',
      allDay: true,
      repeat: false,
      guests: [],
      startTime: null,    //{hour: 0, min: 0, timeOfDay: 'am' }
      endTime: null,
      startTimeIntervals: [
        {hour: 12, minute: 0, period: "AM"},
        {hour: 12, minute: 15, period: "AM"},
        {hour: 12, minute: 30, period: "AM"},
        {hour: 12, minute: 45, period: "AM"},
        {hour: 1, minute: 0, period: "AM"},
        {hour: 1, minute: 15, period: "AM"},
        {hour: 1, minute: 30, period: "AM"},
        {hour: 1, minute: 45, period: "AM"},
        {hour: 2, minute: 0, period: "AM"},
        {hour: 2, minute: 15, period: "AM"},
        {hour: 2, minute: 30, period: "AM"},
        {hour: 2, minute: 45, period: "AM"},
        {hour: 3, minute: 0, period: "AM"},
        {hour: 3, minute: 15, period: "AM"},
        {hour: 3, minute: 30, period: "AM"},
        {hour: 3, minute: 45, period: "AM"},
        {hour: 4, minute: 0, period: "AM"},
        {hour: 4, minute: 15, period: "AM"},
        {hour: 4, minute: 30, period: "AM"},
        {hour: 4, minute: 45, period: "AM"},
        {hour: 5, minute: 0, period: "AM"},
        {hour: 5, minute: 15, period: "AM"},
        {hour: 5, minute: 30, period: "AM"},
        {hour: 5, minute: 45, period: "AM"},
        {hour: 6, minute: 0, period: "AM"},
        {hour: 6, minute: 15, period: "AM"},
        {hour: 6, minute: 30, period: "AM"},
        {hour: 6, minute: 45, period: "AM"},
        {hour: 7, minute: 0, period: "AM"},
        {hour: 7, minute: 15, period: "AM"},
        {hour: 7, minute: 30, period: "AM"},
        {hour: 7, minute: 45, period: "AM"},
        {hour: 8, minute: 0, period: "AM"},
        {hour: 8, minute: 15, period: "AM"},
        {hour: 8, minute: 30, period: "AM"},
        {hour: 8, minute: 45, period: "AM"},
        {hour: 9, minute: 0, period: "AM"},
        {hour: 9, minute: 15, period: "AM"},
        {hour: 9, minute: 30, period: "AM"},
        {hour: 9, minute: 45, period: "AM"},
        {hour: 10, minute: 0, period: "AM"},
        {hour: 10, minute: 15, period: "AM"},
        {hour: 10, minute: 30, period: "AM"},
        {hour: 10, minute: 45, period: "AM"},
        {hour: 11, minute: 0, period: "AM"},
        {hour: 11, minute: 15, period: "AM"},
        {hour: 11, minute: 30, period: "AM"},
        {hour: 11, minute: 45, period: "AM"},
        {hour: 12, minute: 0, period: "PM"},
        {hour: 12, minute: 15, period: "PM"},
        {hour: 12, minute: 30, period: "PM"},
        {hour: 12, minute: 45, period: "PM"},
        {hour: 1, minute: 0, period: "PM"},
        {hour: 1, minute: 15, period: "PM"},
        {hour: 1, minute: 30, period: "PM"},
        {hour: 1, minute: 45, period: "PM"},
        {hour: 2, minute: 0, period: "PM"},
        {hour: 2, minute: 15, period: "PM"},
        {hour: 2, minute: 30, period: "PM"},
        {hour: 2, minute: 45, period: "PM"},
        {hour: 3, minute: 0, period: "PM"},
        {hour: 3, minute: 15, period: "PM"},
        {hour: 3, minute: 30, period: "PM"},
        {hour: 3, minute: 45, period: "PM"},
        {hour: 4, minute: 0, period: "PM"},
        {hour: 4, minute: 15, period: "PM"},
        {hour: 4, minute: 30, period: "PM"},
        {hour: 4, minute: 45, period: "PM"},
        {hour: 5, minute: 0, period: "PM"},
        {hour: 5, minute: 15, period: "PM"},
        {hour: 5, minute: 30, period: "PM"},
        {hour: 5, minute: 45, period: "PM"},
        {hour: 6, minute: 0, period: "PM"},
        {hour: 6, minute: 15, period: "PM"},
        {hour: 6, minute: 30, period: "PM"},
        {hour: 6, minute: 45, period: "PM"},
        {hour: 7, minute: 0, period: "PM"},
        {hour: 7, minute: 15, period: "PM"},
        {hour: 7, minute: 30, period: "PM"},
        {hour: 7, minute: 45, period: "PM"},
        {hour: 8, minute: 0, period: "PM"},
        {hour: 8, minute: 15, period: "PM"},
        {hour: 8, minute: 30, period: "PM"},
        {hour: 8, minute: 45, period: "PM"},
        {hour: 9, minute: 0, period: "PM"},
        {hour: 9, minute: 15, period: "PM"},
        {hour: 9, minute: 30, period: "PM"},
        {hour: 9, minute: 45, period: "PM"},
        {hour: 10, minute: 0, period: "PM"},
        {hour: 10, minute: 15, period: "PM"},
        {hour: 10, minute: 30, period: "PM"},
        {hour: 10, minute: 45, period: "PM"},
        {hour: 11, minute: 0, period: "PM"},
        {hour: 11, minute: 15, period: "PM"},
        {hour: 11, minute: 30, period: "PM"},
        {hour: 11, minute: 45, period: "PM"}
      ]
    }
  },
  props: {
    date: Date
  },
  computed: {
    endTimeIntervals() {
      const startHour = this.startTime.hour;
      const startMinute = this.startTime.minute;
      const startPeriod = this.startTime.period;

      return this.startTimeIntervals.filter(time => {
        if (time.period !== startPeriod) {
          return time.period === "PM";
        }
        if (time.hour > startHour) {
          return true;
        }
        if (time.hour === startHour && time.minute > startMinute) {
          return true;
        }
        return false;
      });
    }
  },
  methods: {
    openPopup(x, y) {
      this.position.top = y;
      this.position.left = x;
      this.visible = true;
    },
    closePopup() {
      this.visible = false
    },
    choseStartTime(timeBlock) {
      this.startTime = timeBlock
    },
    choseEndTime(timeBlock) {
      this.endTime = timeBlock
    },
    async saveEvent() {
      const meetingData = {
        title: this.title,
        description: this.description
      }
      try {
        const response = await api.post(meeting, meetingData);
        console.log('Meeting saved', response.data);
        const scheduleData = {
          date: this.date,
          start_time: `${this.startTime.hour}:${this.startTime.minute}`,
          end_time: `${this.endTime.hour}:${this.endTime.minute}`,
          meeting_id: response.data.id
        }
        const responseSchedule = await api.post(schedule, scheduleData);
        console.log("Schedule response is ", responseSchedule)
        this.closePopup();
      } catch (error) {
        console.error('Error saving event', error);
      }

    },
  }
}
</script>

<template>
  <div v-if="visible" :style="{ top: `${position.top}px`, left: `${position.left}px` }"
       class="z-[100] absolute bg-white border rounded shadow-lg min-h-[40%] min-w-[35%]">
    <div class="flex text-lg flex-col">
      <div class="w-full bg-gray-100 flex h-[35px] justify-end items-center">
        <img :src="crossIcon" alt="x" width="50px"/>
      </div>
      <div class="flex gap-4">
        <div class="my-2 mr-3">
          <input v-model="title" type="text" placeholder="Add title and time"
                 class="w-2/3 ml-20 border-t-0 text-2xl mb-2 p-1 border rounded"/>
          <!--          <img :src="clock" alt="clock"/>-->
          <div class="ml-20 flex flex-col gap-2">
            <input :value="date" type="date" class="w-full mb-2 p-1 border rounded"/>
            <label>Start Time</label>
            <select v-model="startTime">
              <option v-for="startTimeItem in startTimeIntervals" :key="startTimeItem" :value="startTimeItem">
                {{ startTimeItem.hour }}:{{ startTimeItem.minute }}{{ startTimeItem.period }}
              </option>
            </select>
            <br/>
            <label>End Time</label>
            <select v-model="endTime">
              <option v-for="endTimeItem in endTimeIntervals" :key="endTimeItem" :value="endTimeItem">
                {{ endTimeItem.hour }}:{{ endTimeItem.minute }}{{ endTimeItem.period }}
              </option>
            </select>
            <br/>
            <div class="flex justify-end">
              <button @click="saveEvent" class="bg-blue-500 text-white p-2 rounded">Save</button>
              <button @click="closePopup" class="ml-2 p-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>