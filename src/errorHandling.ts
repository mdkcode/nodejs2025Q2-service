import { BadRequestException, NotFoundException } from '@nestjs/common';

export const isValidUUID = (id: string): boolean => {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(id);
};

export const handleErrors = (id: string, items: { id: string }[]) => {
  if (!isValidUUID(id)) {
    throw new BadRequestException(`Invalid UUID: ${id}`);
  }
  const item = items.find((user) => user.id === id);
  if (!item) throw new NotFoundException(`Item with id ${id} not found`);
};
