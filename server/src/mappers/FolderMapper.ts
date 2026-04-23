import { createFolderDto, FolderResponseDto } from "../dtos/FolderDTOs";
import { NoteResponseDto } from "../dtos/NoteDTO";
import Folder, { IFolder } from "../models/Folder";

export class FolderMapper {
  public static toResponseDto(
    folder: IFolder,
    notes?: NoteResponseDto[],
  ): FolderResponseDto {
    return {
      id: folder._id.toString(),
      label: folder.label,
      notes: notes,
    };
  }
  public static toEnity(userId: string, dto: createFolderDto): IFolder {
    return new Folder({
      label: dto.label,
      user: userId,
    });
  }
}
