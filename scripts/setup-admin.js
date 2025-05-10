require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupAdmin() {
  try {
    // 1. Create the admin user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@outlaw.xyz',
      password: 'admin123', // You should change this password
      email_confirm: true,
      user_metadata: {
        preferred_username: 'admin'
      }
    });

    if (authError) {
      console.error('Error creating admin user:', authError);
      return;
    }

    console.log('Admin user created successfully');

    // 2. Create the admin account in the accounts table
    const { data: accountData, error: accountError } = await supabase
      .from('accounts')
      .insert([
        {
          id: authData.user.id,
          email: 'admin@outlaw.xyz',
          twitter_handle: '@admin',
          total_points: 100000, // Admin gets high points
          invitation_code: 'ADMIN2024', // Special admin code
          invited_accounts_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (accountError) {
      console.error('Error creating admin account:', accountError);
      return;
    }

    console.log('Admin account created successfully');

    // 3. Create initial invitation codes
    const initialCodes = [
      { code: 'ares10', points: 20000 },
      { code: 'HCANFT', points: 1000 },
      { code: 'kodama', points: 5000 },
      { code: 'SULTAN', points: 5000 },
      { code: 'e38502', points: 20000 },
      { code: '881711', points: 20000 },
      { code: 'heroes', points: 20000 },
      { code: 'blever', points: 20000 },
      { code: 'lambss', points: 20000 },
      { code: 'lgtdao', points: 20000 },
      { code: 'gana10', points: 20000 },
      { code: 'mira10', points: 20000 },
      { code: 'zaimir', points: 20000 },
      { code: 'loshmi', points: 20000 },
      { code: 'reikoo', points: 20000 },
      { code: 'mic100', points: 20000 },
      { code: 'NFTNFT', points: 20000 },
      { code: 'ronnie', points: 20000 }
    ];

    const { error: codesError } = await supabase
      .from('invitation_codes')
      .insert(
        initialCodes.map(({ code }) => ({
          code,
          generated_by: authData.user.id,
          created_at: new Date().toISOString(),
          is_used: false
        }))
      );

    if (codesError) {
      console.error('Error creating initial codes:', codesError);
      return;
    }

    console.log('Initial invitation codes created successfully');
    console.log('\nSetup completed successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@outlaw.xyz');
    console.log('Password: admin123');
    console.log('Admin Invitation Code: ADMIN2024');
    console.log('\nInitial invitation codes have been created with their respective point values.');

  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setupAdmin(); 