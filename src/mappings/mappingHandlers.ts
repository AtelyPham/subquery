import { Balance } from '@polkadot/types/interfaces'
import { SubstrateEvent } from '@subql/types'
import { Transfer } from '../types'

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [from, to, amount],
    },
  } = event

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  )

  transfer.blockNumber = event.block.block.header.number.toBigInt()
  transfer.from = from.toString()
  transfer.to = to.toString()
  transfer.amount = (amount as Balance).toBigInt()
  await transfer.save()
}
