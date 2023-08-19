export const GenericToast = {
  methods: {
    genericSuccessToast(type = 'success') {
      if (type === 'success')
        this.$toast.show(this.$t('mixins.generic_toast.success_message'))
      if (type === 'createUserSuccess')
        this.$toast.show(
          this.$t('mixins.generic_toast.create_user_success_msg')
        )
      if (type === 'updateUserSuccess')
        this.$toast.show(
          this.$t('mixins.generic_toast.update_user_success_msg')
        )
    },
  },
}
