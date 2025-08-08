<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { SpotModel } from '@/models/spot.model';
import { AuthService } from '@/services/auth.service';
import { SpotService } from '@/services/spot.service';
import { ref } from 'vue';

const logout = useLogout()
const spots = ref<SpotModel[]>()
const allSpots = ref<SpotModel[]>()

const token = AuthService.getAccessToken()


SpotService.getSpots()
  .then(rsp => {
      allSpots.value = rsp.data
      spots.value = rsp.data
  })
  .catch(e => logout(e))


function doSearch(e: any) {
  if(allSpots.value == undefined) return

  const input = e.target.value ? e.target.value.toLowerCase() : ''

  if (input == '') {
    spots.value = allSpots.value
  }
  
  spots.value = allSpots.value.filter(f => {
    return f.name.toLowerCase().includes(input) ||
      f.location.toLowerCase().includes(input)
  })
}

</script>

<template>
  <Navigation />
    <div class="input-group mb-3 search">

    </div>
</template>
