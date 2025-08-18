<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { SpotModel } from '@/models/spot.model';
import type { UserModel } from '@/models/user.model';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { SpotService } from '@/services/spot.service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const logout = useLogout()
const spots = ref<SpotModel[]>()
const allSpots = ref<SpotModel[]>()
const users = ref<UserModel[]>()
const router = useRouter()


if (!AuthService.hasAuth()) {
  router.push('/user/login')
}

const token = AuthService.getAccessToken()
const userAndIDMap = new Map<number, string>()



SpotService.getSpots()
  .then(rsp => {
      allSpots.value = rsp.data
      spots.value = rsp.data
  })
  .catch(e => logout(e))
/*
MainService.getUsers()
  .then(rsp => {
    users.value = rsp.data
  })
  .catch(e => logout(e))

setTimeout(() => {
  for (const u of users.value!) userAndIDMap.set(u.userId, u.name)
}, 200)

*/

onMounted(async () => {
  try {
    const [userRsp] = await Promise.all([
      MainService.getUsers()
    ])


    for (const u of userRsp.data ?? []) {
      console.log(u)
      console.log(u.userId + u.name)
      userAndIDMap.set(u.userId, u.name)
    }
    console.log(userAndIDMap)
  } catch (e) {
    console.log("a")
  }
})

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
            <p>Added by {{ userAndIDMap.get(s.addedBy!) ?? "unknown"}} </p>
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
