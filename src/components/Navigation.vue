<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { AuthService } from '@/services/auth.service';
import { useLogout } from '@/hooks/logout.hook';

const logout = useLogout()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">
                <i class="fa-solid fa-campground"></i> YEY
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <template v-if="AuthService.hasAuth()">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/">
                                <i class="fa-solid fa-house"></i> Home
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="nav-link" @click="logout(null)">
                                <i class="fa-solid fa-right-from-bracket"></i> Logout
                            </button>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/user/login">
                                <i class="fa-solid fa-right-to-bracket"></i> Login
                            </RouterLink>
                        </li>
                    </template>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">
                            <i class="fa-solid fa-circle-info"></i> About
                        </RouterLink>
                    </li>
                </ul>
                <span class="navbar-text" v-if="AuthService.hasAuth()">
                    <i class="fa-solid fa-user"></i> {{ AuthService.getUser() }}
                </span>
            </div>
        </div>
    </nav>
</template>