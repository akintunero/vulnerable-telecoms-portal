import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase() {
  let connection;
  
  try {
    // Create connection without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('Connected to MySQL server');

    // Read and execute schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    // Execute each statement
    for (const statement of statements) {
      if (statement) {
        try {
          await connection.execute(statement);
          console.log('Executed:', statement.substring(0, 50) + '...');
        } catch (error) {
          console.error('Error executing statement:', error);
        }
      }
    }

    console.log('Database initialized successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the initialization
initializeDatabase(); // Database schema - Sat Jun 21 02:05:40 WAT 2025
