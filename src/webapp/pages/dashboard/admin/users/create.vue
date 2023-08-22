<template>
  <b-card>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-row>
        <b-col md="6">
          <b-form-group
            id="input-group-first-name"
            :label="$t('common.user.first_name.label_required')"
            label-for="input-first-name"
          >
            <b-form-input
              id="input-first-name"
              v-model="form.firstName"
              type="text"
              :placeholder="$t('common.user.first_name.placeholder')"
              autofocus
              trim
              required
              :state="formState('firstName')"
            />
            <b-form-invalid-feedback :state="formState('firstName')">
              <ErrorsList :errors="formErrors('firstName')" />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-last-name"
            :label="$t('common.user.last_name.label_required')"
            label-for="input-last-name"
          >
            <b-form-input
              id="input-last-name"
              v-model="form.lastName"
              type="text"
              :placeholder="$t('common.user.last_name.placeholder')"
              trim
              required
              :state="formState('lastName')"
            />
            <b-form-invalid-feedback :state="formState('lastName')">
              <ErrorsList :errors="formErrors('lastName')" />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="6">
          <b-form-group
            id="input-group-email"
            :label="$t('common.email.label_required')"
            label-for="input-email"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="text"
              :placeholder="$t('common.email.placeholder')"
              trim
              required
              :state="formState('email')"
            />
            <b-form-invalid-feedback :state="formState('email')">
              <ErrorsList :errors="formErrors('email')" />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-locale"
            :label="$t('common.user.locale.label_required')"
            label-for="input-locale"
          >
            <b-form-select
              id="input-locale"
              v-model="form.locale"
              :options="localesAsSelectOptions()"
              required
              :state="formState('locale')"
            ></b-form-select>
            <b-form-invalid-feedback :state="formState('locale')">
              <ErrorsList :errors="formErrors('locale')" />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-role"
            :label="$t('common.user.role.label_required')"
            label-for="input-role"
          >
            <b-form-select
              id="input-role"
              v-model="form.role"
              :options="rolesAsSelectOptions()"
              required
              :state="formState('role')"
            ></b-form-select>
            <b-form-invalid-feedback :state="formState('role')">
              <ErrorsList :errors="formErrors('role')" />
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- new inputs start -->
      <b-form-row>
        <b-col md="6">
          <b-form-group
            id="input-group-country"
            :label="$t('common.user.country.label_required')"
            label-for="input-country"
          >
            <b-form-input
              id="input-country"
              v-model="form.country"
              type="text"
              :placeholder="$t('common.user.country.placeholder')"
              autofocus
              trim
              required
              :state="formState('country') || countryValidationState"
            />
            <b-form-invalid-feedback :state="formState('country')">
              <ErrorsList :errors="formErrors('country')" />
            </b-form-invalid-feedback>
            <b-form-invalid-feedback :state="countryValidationState">
              This value must contain only letters or hyphen
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-phoneNumber"
            :label="$t('common.user.phoneNumber.label_required')"
            label-for="input-last-name"
          >
            <b-form-input
              id="input-phoneNumber"
              v-model="form.phoneNumber"
              type="text"
              :placeholder="$t('common.user.phoneNumber.placeholder')"
              trim
              required
              :state="formState('phoneNumber') || phoneNumberValidationState"
            />
            <b-form-invalid-feedback :state="formState('phoneNumber')">
              <ErrorsList :errors="formErrors('phoneNumber')" />
            </b-form-invalid-feedback>
            <b-form-invalid-feedback :state="phoneNumberValidationState">
              This value must contain only numbers
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- new inputs end-->
      <b-form-group
        id="input-group-profile-picture"
        :label="$t('common.user.profile_picture')"
        label-for="input-profile-picture"
      >
        <b-form-file
          id="input-profile-picture"
          v-model="form.profilePicture"
          :placeholder="$t('common.single_file.placeholder')"
          :drop-placeholder="$t('common.single_file.drop_placeholder')"
          :browse-text="$t('common.browse')"
          :state="formState('profile_picture')"
        ></b-form-file>
        <div v-if="form.profilePicture !== null" class="mt-3">
          <FilesList :files="[form.profilePicture]" />
        </div>
        <b-form-invalid-feedback :state="formState('profile_picture')">
          <ErrorsList :errors="formErrors('profile_picture')" />
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary">
        {{ $t('common.create') }}
      </b-button>
    </b-form>
  </b-card>
</template>

<script>
import FilesList from '@/components/forms/FilesList'
import ErrorsList from '@/components/forms/ErrorsList'
import { Form } from '@/mixins/form'
import { Roles } from '@/mixins/roles'
import { Locales } from '@/mixins/locales'
import { CreateUserMutation } from '@/graphql/users/create_user.mutation'
import { GlobalOverlay } from '@/mixins/global-overlay'
import { GenericToast } from '@/mixins/generic-toast'

export default {
  components: { ErrorsList, FilesList },
  mixins: [Form, Roles, Locales, GlobalOverlay, GenericToast],
  layout: 'dashboard',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        locale: null,
        role: null,
        profilePicture: null,
        country: '',
        phoneNumber: null,
      },
      countryValidationState: null,
      phoneNumberValidationState: null,
    }
  },
  computed: {
    countryValue() {
      return this.form.country
    },
    phoneNumberValue() {
      return this.form.phoneNumber
    },
  },
  watch: {
    countryValue(val) {
      this.validateCountry(val)
    },
    phoneNumberValue(val) {
      this.validatePhoneNumber(val)
    },
  },
  methods: {
    async onSubmit() {
      this.resetFormErrors()
      this.displayGlobalOverlay()

      try {
        const result = await this.$graphql.request(CreateUserMutation, {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          locale: this.form.locale,
          role: this.form.role,
          profilePicture: this.form.profilePicture,
          country: this.form.country,
          phoneNumber: Number(this.form.phoneNumber),
        })

        this.genericSuccessToast('createUserSuccess')

        this.$router.push(
          this.localePath({
            name: 'dashboard-admin-users-id',
            params: { id: result.createUser.id },
          })
        )
      } catch (e) {
        this.hydrateFormErrors(e)
      } finally {
        this.hideGlobalOverlay()
      }
    },
    validateCountry(val) {
      if (!/^[-a-zA-Z ]*$/.test(val)) {
        this.countryValidationState = false

        setTimeout(() => {
          this.form.country = this.sanitizeCountry(val)
        }, 1000)
      } else {
        this.countryValidationState = true
      }
    },
    validatePhoneNumber(val) {
      if (!/^[0-9]*$/.test(val)) {
        this.phoneNumberValidationState = false

        setTimeout(() => {
          this.form.phoneNumber = this.sanitizePhoneNumber(val)
        }, 1000)
      } else {
        this.phoneNumberValidationState = true
      }
    },
    sanitizeCountry(val) {
      let sanitized = ''
      const letters = ' abcdefghijklmnopqrstuvwxyz-'

      val.split('').forEach((c) => {
        if (letters.includes(c.toLowerCase())) {
          sanitized += c
        }
      })

      return sanitized
    },
    sanitizePhoneNumber(val) {
      let sanitized = ''
      const digits = '0123456789'

      val.split('').forEach((c) => {
        if (digits.includes(c)) {
          sanitized += c
        }
      })

      return sanitized
    },
  },
}
</script>
