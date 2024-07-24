<script>
import {convertTimeToCurrentTimeZone} from "@/helpers/dateHelpers.js";

export default {
  name: "SchedulesMixin",
  methods: {
    formatSchedules(schedules) {
      return schedules.map(schedule=> {
        return {
          meetingTitle: schedule.meeting.title,
          date: schedule.date,
          startTime: convertTimeToCurrentTimeZone(schedule.start_time),
          endTime: convertTimeToCurrentTimeZone(schedule.end_time),
        }
      })
    },
    getFilteredSchedulesInDate(date, allSchedules) {
      return allSchedules.filter((schedule)=> {
        return new Date(schedule.date).toDateString() === new Date(date).toDateString()
      })
    }
  }
}
</script>