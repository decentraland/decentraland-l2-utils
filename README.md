# decentraland-l2-utils

This library includes a number of helpful pre-built tools that help you deal with common requirements that involve and interacting with data on the second layer blockchain.

- [ERC20](#ERC20)
  - [Get balance](#get-balance)
  - [Deposit MANA](#deposit-MANA)
  - [Send MANA](#send-MANA)
  - [Withdraw MANA](#withdraw-MANA)

## Using the L2 library

To use any of the helpers provided by the utils library

1. Install it as an `npm` package. Run this command in your scene's project folder:

```
npm i @dcl/l2-scene-utils eth-connect decentraland-transactions -B
```

Note: This command also installs the latest version of the decentraland-transactions and eth-connect libraries, that are dependencies of the l2 utils library

2. Run `dcl start` or `dcl build` so the dependencies are correctly installed.

3. Import the library into the scene's script. Add those lines at the start of your `game.ts` file, or any other TypeScript files that require it:

```ts
import * as l2 from '@dcl/l2-scene-utils'
import * as ethConnect from 'eth-connect'
```

```ts
const { mana } = await l2.createComponents()
const balanceWei = await mana.balance('0xFE2d424AF0Df49Bb3316cB2E9f574b0D09cf98Ad')
log(balanceWei)
if (
  new ethConnect.BigNumber(ethConnect.fromWei(balanceWei, 'ether')).comparedTo(
    new ethConnect.BigNumber(1)
  ) >= 0
) {
  mana
    .transfer(
      `0xFE2d424AF0Df49Bb3316cB2E9f574b0D09cf98Ad`,
      new ethConnect.BigNumber(ethConnect.toWei(1, 'ether'))
    )
    .then(
      () => {},
      (error) => {
        log('error', error)
      }
    )
}
```

## MANA Operations

As MANA is Decentraland's main currency, this library provies tools to make it especially easy to use in a scene.

### Get balance of an address

To check the balance of a specific address in MANAwei, use the `balance()` function. This function has an optional argument:

- `address`: Ethereum address to check, if not provided, it will check the balance of the

```ts
executeTask(async (e) => {
  const { mana } = await l2.createComponents()
  const balanceWei = await mana.balance('0xFE2d424AF0Df49Bb3316cB2E9f574b0D09cf98Ad')
  log(balanceWei)
})
```

### Send MANA to an address

To make players in your scene send MANA to a specific address, use the `transfer()` function. This function requires the following arguments:

- `to`: What ethereum address to send the MANA to
- `amount`: How many MANAwei to send

```ts
mana.transfer(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, your scene can have a button that requests players to make a MANA payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import * as l2 from '@dcl/l2-scene-utils'
import * as ethConnect from 'eth-connect'

(...)

button.addComponent(new OnPointerDown(async e => {
	const { mana } = await l2.createComponents()
	const tx = await mana.transfer(
		`0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692`,
		new ethConnect.BigNumber(ethConnect.toWei(1, 'ether'))
	)
}))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction.
Once that transaction is sent on the Matic network, the door opens.

---

## Contribute

In order to test changes made to this repository in active scenes, do the following:

1. Run `npm run link` on this repository
2. On the scene directory, after you installed the dependency, run `npm link @dcl/l2-scene-utils`

## CI/CD

This repository uses `semantic-release` to atumatically release new versions of the package to NPM.

Use the following convention for commit names:

`feat: something`: Minor release, every time you add a feature or enhancement that doesn’t break the api.

`fix: something`: Bug fixing / patch

`chore: something`: Anything that doesn't require a release to npm, like changing the readme. Updating a dependency is **not** a chore if it fixes a bug or a vulnerability, that's a `fix`.

If you break the API of the library, you need to do a major release, and that's done a different way. You need to add a second comment that starts with `BREAKING CHANGE`, like:

```
commit -m "feat: changed the signature of a method" -m "BREAKING CHANGE: this commit breaks the API, changing foo(arg1) to foo(arg1, arg2)"
```
