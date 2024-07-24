<script>
import {DayMapping, MonthMapping} from "@/constants/dates.js";
import {getMonth} from "date-fns";

export default {
  name: "DatesMixin",
  methods: {
    getDescriptiveDay(day) {
      return DayMapping[day]
    },
    getDescriptiveMonth(month) {
      return MonthMapping[month]
    }
  }
}
</script>
