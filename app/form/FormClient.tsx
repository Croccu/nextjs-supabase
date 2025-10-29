'use client'

import { useState } from 'react'
import { TextInput, Textarea, Button, Group, Paper, Title, Stack } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'

export default function FormClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateTime: new Date(),
    message: '',
  })

  const handleChange = (field: string, value: string | number | Date | null) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <Paper shadow="lg" radius="lg" p="xl" withBorder>
      <Title order={2} ta="center" mb="lg">
        Isikuandmete vorm
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Group grow>
            <TextInput
              label="Eesnimi"
              placeholder="Sisesta eesnimi"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
            />
            <TextInput
              label="Perekonnanimi"
              placeholder="Sisesta perekonnanimi"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
            />
          </Group>

          <TextInput
            label="E-mail"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />

          <TextInput
            label="Telefoni number"
            placeholder="+372 5555 5555"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />

          <DateTimePicker
            label="Kuupäev ja kellaaeg"
            value={formData.dateTime}
            onChange={(val) => handleChange('dateTime', val)}
            required
          />

          <Textarea
            label="Lisainfo"
            placeholder="Lisa siia täiendav info..."
            autosize
            minRows={3}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
          />

          <Button type="submit" color="white" size="md" radius="md" fullWidth  styles={{label: { color: 'black' }}} >
            Saada
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
