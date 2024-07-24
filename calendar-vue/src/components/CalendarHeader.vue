<script>
import DatesMixin from "@/mixins/DatesMixin.vue";

export default {
  name: "CalendarHeader",
  props: {selectedMonth: Number, selectedYear: Number},
  mixins: [DatesMixin],
}
</script>

<template>
  <div class="mx-4 w-full">
    <div class="flex items-center justify-evenly w-full">
      <h1 class="text-2xl">
        Calendar
      </h1>
      <p class="border-gray-300 text-sm border-[1px] px-3 py-2 rounded">
        Today
      </p>
      <h1 class="text-xl font-bold">{{getDescriptiveMonth(selectedMonth)}}-{{selectedYear}}</h1>
      <div class="flex gap-3">
        <img src="@/assets/less-than-solid.svg" alt="<" width="15px"
             @click="$emit('changeMonth', false)"
             class="cursor-pointer"
        />
        <img src="@/assets/greater-than-solid.svg" alt="<" width="15px"
             @click="$emit('changeMonth', true)"
             class="cursor-pointer"
        />
      </div>
      <div class="flex gap-4">
        <img src="@/assets/search.png" alt="<" width="15px"/>
        <!--            <img src="@/assets/search.png" alt="?" width="15px"/>-->
        <!--            <img src="@/assets/search.png" alt="set" width="15px"/>-->
        <img src="@/assets/calendar-icon.png" alt="cal" width="20px"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>