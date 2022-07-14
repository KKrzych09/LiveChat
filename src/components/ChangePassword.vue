<template>
    <div class="change">
        <h1>Change your password</h1>
        <form @submit="handleSubmit">
            <input type="password" required placeholder="Current password" v-model="password">
            <input type="password" required placeholder="New password" v-model="password">
            <input type="password" required placeholder="Repeat new password" v-model="newPassword">
            <div class="error">{{ error }}</div>
            <button>Change password</button>
        </form>
        <button class="back">Back</button>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .change {
        text-align: center;
        padding: 20px 0;
        position: relative;
    }
    .change form {
        width: 300px;
        margin: 20px auto;
    }
    .change label {
        display: block;
        margin: 20px 0 10px;
    }
    .change input {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #eee;
        outline: none;
        color: #999;
        margin: 10px auto;
    }
    .change span {
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }
    .change button {
        margin: 20px auto;
    }
    .change button.back {
        position: absolute;
        top: 0;
        left: 0;
        margin: 15px 20px;
    }
</style>