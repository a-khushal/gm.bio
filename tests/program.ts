import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import type { ProfileProgram } from "../target/types/profile_program.js";
import assert from "assert";

describe("profile_program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ProfileProgram as anchor.Program<ProfileProgram>;

  const user = provider.wallet;

  const username = "tQDR";
  const bio = "AHYs";
  const links = ["Qufq", "lOav", "xydK", "lyHad"];

  let profilePda: PublicKey;
  let usernameRegistryPda: PublicKey;

  before(async () => {
    [profilePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("profile"), user.publicKey.toBuffer()],
      program.programId
    );

    [usernameRegistryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("username"), Buffer.from(username, "utf-8")],
      program.programId
    );
  });

  it("creates a profile", async () => {
    await program.methods
      .createProfile(username, bio, links)
      .accounts({
        user: user.publicKey,
      })
      .rpc();

    const profile = await program.account.userProfile.fetch(profilePda);

    assert.strictEqual(profile.owner.toBase58(), user.publicKey.toBase58());
    assert.strictEqual(profile.username, username);
    assert.strictEqual(profile.bio, bio);

    const fetchedLinks = profile.links.map((l: any) => l.toString());
    assert.deepStrictEqual(fetchedLinks, links);
  });

  it("updates profile", async () => {
    const newBio = "Updated bio";
    const newLinks = ["https://example.com", "https://solana.com"];

    await program.methods
      .updateProfile(newBio, newLinks)
      .accounts({
        user: user.publicKey,
      })
      .rpc();

    const updated = await program.account.userProfile.fetch(profilePda);
    assert.strictEqual(updated.bio, newBio);
    const fetchedLinks = updated.links.map((l: any) => l.toString());
    assert.deepStrictEqual(fetchedLinks, newLinks);
  })
});
