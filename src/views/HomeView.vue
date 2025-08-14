<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { SpotModel } from '@/models/spot.model';
import { AuthService } from '@/services/auth.service';
import { SpotService } from '@/services/spot.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const logout = useLogout()
const spots = ref<SpotModel[]>()
const allSpots = ref<SpotModel[]>()
const router = useRouter()


if (!AuthService.hasAuth()) {
  router.push('/user/login')
}

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


function goToSpot(id: number) {
  console.log(id)
  router.push(`/spot/${id}`)
}

</script>

<template>
  <Navigation />
    <div class="input-group mb-3 search">
      <span class="input-group-text" id="search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input type="text" class="form-control" aria-describedby="search" placeholder="Name, Location" @keyup="(e) => doSearch(e)"></input>
    </div>
    <div class="wrapper mb-3" v-if="spots">
      <div class="card spot-card" v-for="s in spots" :key="s.spotId">
        <div class="card-body">
          <h4 class="card-title">{{ s.name }}</h4>
          <h5 class="card-subtitle mb-2 text-body-secondary">{{ s.location }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p>Added by {{ s.addedBy ?? "unknown"}}</p>
          </li>
          <li class="list-group-item">
            <RouterLink :to="`/spot/${s.spotId}`" class="btn btn-sm btn-primary">
              Check it out
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
</template>
