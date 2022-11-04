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
npm i @dcl/l2-scene-utils @dcl/ecs-scene-utils eth-connect -B
```

Note: This command also installs the latest version of the @dcl/ecs-scene-utils and eth-connect libraries, that are dependencies of the l2 utils library

2. Run `dcl start` or `dcl build` so the dependencies are correctly installed.

3. Import the library into the scene's script. Add this line at the start of your `game.ts` file, or any other TypeScript files that require it:

```ts
import * as layerTwo from '@dcl/l2-scene-utils'
```

If you'll only be using part of this library in your scene, we recommend instead only importing the specific relevant subfolder/s. For example:

```ts
import { matic } from '@dcl/l2-scene-utils'
```

4. In your TypeScript file, write `layerTwo.` and let the suggestions of your IDE show the available helpers.

## MANA Operations

As MANA is Decentraland's main currency, this library provies tools to make it especially easy to use in a scene.

### Get balance of an address

To get the current MANA balance of a specific address, use the `balance()` function. This function requires the following arguments:

- `address`: What ethereum address to get the MANA balance

```ts
matic.balance(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`)
```

For example, your scene can have a button that requests players to make a MANA payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import { matic } from '@dcl/l2-scene-utils'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	const balance = await matic.balance(myWallet)
	if(balance > 10) {
		// open door
	}
))
```

### Send MANA to an address

To make players in your scene send MANA to a specific address, use the `sendMana()` function. This function requires the following arguments:

- `toAddress`: What ethereum address to send the MANA to
- `amount`: How many MANA tokens to send

```ts
matic.sendMana(`0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`, 100)
```

For example, your scene can have a button that requests players to make a MANA payment to the scene cretor's personal wallet. The button opens a door, but only once a transaction is sent to pay the fee.

```ts
import { matic } from '@dcl/l2-scene-utils'

(...)

let myWallet = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

button.addComponent(new OnPointerDown(async e => {
	await matic.sendMana(myWallet, 100).then(
		// open door
	)
  }
))
```

In this scenario, when players click on the button, they are prompted by Metamask to accept the transaction.
Once that transaction is confirmed on the Matic network, the door opens.


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
