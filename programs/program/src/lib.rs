use anchor_lang::prelude::*;

declare_id!("7EiXfcfkDh4eQWTWhrUNydZroe6sQiZzxryfbSwS1ddf");

const MAX_USERNAME_LEN: usize = 32;
const MAX_BIO_LEN: usize = 280;
const MAX_LINKS: usize = 8;
const MAX_LINK_LEN: usize = 128;

const PROFILE_SPACE: usize = 8  // account discriminator
    + 32 // owner Pubkey
    + 4 + MAX_USERNAME_LEN // username string
    + 4 + MAX_BIO_LEN // bio string
    + 4 + (MAX_LINKS * (4 + MAX_LINK_LEN)); // Vec<String>

const USERNAME_REGISTRY_SPACE: usize = 8 + 32; // discriminator + owner pubkey

#[allow(deprecated)]
#[program]
pub mod profile_program {
    use super::*;

    pub fn create_profile(
        ctx: Context<CreateProfile>,
        username: String,
        bio: String,
        links: Vec<String>,
    ) -> Result<()> {
        require!(
            username.len() <= MAX_USERNAME_LEN,
            ProfileError::UsernameTooLong
        );
        require!(bio.len() <= MAX_BIO_LEN, ProfileError::BioTooLong);
        require!(links.len() <= MAX_LINKS, ProfileError::TooManyLinks);
        for l in &links {
            require!(l.len() <= MAX_LINK_LEN, ProfileError::LinkTooLong);
        }

        let profile = &mut ctx.accounts.profile;
        profile.owner = ctx.accounts.user.key();
        profile.username = username.clone();
        profile.bio = bio;
        profile.links = links;

        let registry = &mut ctx.accounts.username_registry;
        registry.owner = ctx.accounts.user.key();

        Ok(())
    }

    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        bio: Option<String>,
        links: Option<Vec<String>>,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        require_keys_eq!(
            profile.owner,
            ctx.accounts.user.key(),
            ProfileError::Unauthorized
        );

        if let Some(b) = bio {
            require!(b.len() <= MAX_BIO_LEN, ProfileError::BioTooLong);
            profile.bio = b;
        }

        if let Some(ls) = links {
            require!(ls.len() <= MAX_LINKS, ProfileError::TooManyLinks);
            for l in &ls {
                require!(l.len() <= MAX_LINK_LEN, ProfileError::LinkTooLong);
            }

            profile.links = ls;
        }

        Ok(())
    }
}

#[account]
pub struct UserProfile {
    pub owner: Pubkey,
    pub username: String,
    pub bio: String,
    pub links: Vec<String>,
}

#[account]
pub struct UsernameRegistry {
    pub owner: Pubkey,
}

#[derive(Accounts)]
#[instruction(username: String)]
pub struct CreateProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = PROFILE_SPACE,
        seeds = [b"profile", user.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, UserProfile>,

    #[account(
        init,
        payer = user,
        space = USERNAME_REGISTRY_SPACE,
        seeds = [b"username", username.as_bytes()],
        bump
    )]
    pub username_registry: Account<'info, UsernameRegistry>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [b"profile", user.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, UserProfile>,
}

#[error_code]
pub enum ProfileError {
    #[msg("Username too long")]
    UsernameTooLong,
    #[msg("Bio too long")]
    BioTooLong,
    #[msg("Too many links")]
    TooManyLinks,
    #[msg("Link too long")]
    LinkTooLong,
    #[msg("Unauthorized")]
    Unauthorized,
}
