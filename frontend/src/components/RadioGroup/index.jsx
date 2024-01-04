import { Radio, Group } from "@mantine/core";

export default function RadioGroup({
  value,
  onChange,
  name,
  label,
  withAsterisk,
}) {
  return (
    <Radio.Group
      value={value}
      onChange={(value) => onChange(value)}
      mt="md"
      name={name}
      label={label}
      withAsterisk={withAsterisk}
      required
    >
      <Group mt="xs">
        <Radio value="true" label="Yes" />
        <Radio value="false" label="No" />
      </Group>
    </Radio.Group>
  );
}
