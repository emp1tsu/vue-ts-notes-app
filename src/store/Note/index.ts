/* eslint-disable class-methods-use-this */
// @ts-nocheck
import { mockNotes, mockTags } from '@/mock';
import store from '@/store';
import {
  Action, getModule, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { Note } from '../types';


@Module({
  dynamic: true,
  namespaced: true,
  name: 'notes',
  store,
})
class Notes extends VuexModule {
  private notes: Note[] = [];

  private tags: string[] = [];

  public get findAllNote(): Note[] {
    return this.notes;
  }

  public get findNote(): Note[] {
    return (tag) => {
      const result: Note[] = [];

      if (!tag) return [];
      if (tag === 'AllNotes') return this.notes;

      for (let i = 0; i < this.notes.length; i += 1) {
        const note = this.notes[i];
        if (tag) {
          if (note.tags.some((t) => t === tag)) result.push(note);
        } else if (!note.tags) result.push(note);
      }

      return result;
    };
  }

  public get findAllTags(): string[] {
    const result = [];
    for (let i = 0; i < this.tags.length; i += 1) {
      const tag = this.tags[i];

      result.push({ name: tag });
    }

    return result;
  }

  @Mutation
  addNote(note: Note) {
    this.notes.push(note);
  }

  @Mutation
  updateNote(notes: Note[]) {
    this.notes = notes;
  }

  @Mutation
  removeNote(note: Note) {
    this.notes = this.notes.filter((n) => n.id !== note.id);
  }

  @Mutation
  updateTag(tags: string[]) {
    this.tags = tags;
  }

  @Action
  fetchData() {
    this.context.commit('updateNote', mockNotes);
    this.context.commit('updateTag', mockTags);
  }

  @Action({ commit: 'addNote' })
  createNote(note: Note) {
    return note;
  }

  @Action({ commit: 'removeNote' })
  deleteNote(note: Note) {
    return note;
  }
}

export default getModule(Notes);
