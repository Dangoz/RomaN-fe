# RomaN
<h3>App Link:</h3><div>https://roman-date.vercel.app</div>
<h3>Github Organization Link (Repositories):</h3><div>https://github.com/RomaN-Date</div>

<h3>RomaN Contract Addresses:</h3>
<div>User: https://mumbai.polygonscan.com/address/0x2C2EFa09d5f9bCC854A658c6b724d3C6166c91e1</div>
<div>Token: https://mumbai.polygonscan.com/address/0x7050078cB25665EBffB8C9422a60A205Fe982D7E</div>
<div>Vault: https://mumbai.polygonscan.com/address/0x0852249ab5c8b98bfaD154788a4D1361a39bbf19</div>

## Description
Roman is a socialfi dating dApp, prepaid, pay and earn by LIKE, built with trust transparency and honesty in mind.
The blockchain and the sponsored protocols comes with brilliant solutions to leverage web2 dating industry with content, interoperability and incentives.
With user interactions built based on decentralized protocols, users receive recommended links through CyberConnect, view pre-generated profiles through RSS3, and are able to converse with ones' digital identity through XMTP.

## Privacy & Verfication
#### Problem: 
- Users don't have ownership of their data. User profiles are often fake and created by unverified identities.
#### Solution: 
- User identities are based on one's address.
- User retain ownership of their data such as content, posts and social links.
- On RomaN, based on existing identities and newly create social links, users are only able to chat with the ones who share a mutual LIKE relationship.

## Cold Start Problem
#### Problem:
- Content creators wouldn't come without users, and users wouldn't come without content. Web2 social or dating applications often face difficulties building ones' initial user base, in order to scale its network effects.
#### Solution:
- The hard side of the two parties - content creators can be solved, by leveraging data linked from decentralized distribution protocols.
- Users' social links can be carried over to RomaN, and become a contributing factor in users' feed.
- For users who have built meaningful relationship on RomaN or even before RomaN, conversations can be established across applications.
- Future recommendation/extension: encourage users to establish profile with Next.ID/Mask.io for use on RomaN.

## Monetization
#### Problem:
- Fierce competition with monthly subscription via bank or Payal as the primary revenue stream.
- Limited services for unsubscribed users.
#### Solution:
- RomaN is designed to solve all the web2 monetisation problems.
    - Users can browser, search profiles for free.
    - User get free pre-generated profiles and can be viewed by others.
    - User can mint their profile as NFT - RomaNToken
    - RomanToken is a SoulBound-Like NFT. Any address can mint only one token and transfer functions are blocked.
    - RomanToken holders can deposit any value in ether (with stableCoin** as a future extension) to the RomanTokenVault contract(payment channel)
    - Interacting with others (view a profile***, like, msg, .....) will trigger a transfer of a variable amount of the ether (or stableCoin) with no fees.
    - Users can withdraw any time their sold or recharge their balance.
- The site is ads free, we monetise by taking a percentage of the transfer to pay for the infra (hosting, ...) and the RomaN Team.

## Trust & Transparency
#### Problem:
- Web 2 social or dating applications are often filled with bots and spams.
#### Solution:
- All transactions are saved on the blockchain ledgers and public.
- Proof of humanity to mint a RomanToken.
- On Chain Behavior Score
    - Assuming user's full honesty, user behavior score defaults at 100 upon RomaNToken mint.
    - Each time a user gets reported, behaviour is deducted by one which will affect directly the reward that they can withdraw:
        - Example:
            - view profile = 100,
            - commission = 10,
            - user A behaviour = 100,
            - user B behaviour = 50 (user B blocked 50 times)
            - user A view user B profile : user A pay 100, user B receive = 100*(50/100) - 10 = 40
            - user B view user A profile : user B pay 100, user A receive = 100*(100/100) - 10 = 90
- Users have access to follow or LIKE, be followed or be LIKED, match or CONNECTED, and block or REPORT with others.

<div>* plus tx fees</div>
<div>** using ether for testnet</div>
<div>*** some interactions are paid once</div>
