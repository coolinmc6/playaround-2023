import { type Entry } from '@/app/concepts/custom-hooks/hooks/fitness-helper-types'

class EntryObject {
  public date: string
  public data: any

  constructor(entry: Entry) {
    this.date = entry.date
    this.data = entry.data
  }
}

class DateListObject {
  public rawEntries: Entry[]
  public allEntries: EntryObject[]

  constructor(entries: Entry[]) {
    this.rawEntries = entries
    this.allEntries = entries.map((entry: Entry) => new EntryObject(entry))
  }
}

export default DateListObject
