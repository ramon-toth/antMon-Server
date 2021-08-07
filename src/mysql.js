import mysql from 'mysql';
import { MYSQL_SERVER } from './config.js';

const connection = mysql.createConnection(MYSQL_SERVER);

connection.connect(function (err) {
  if (err) {
    console.error('MySQL Connection Error: ' + err.stack);
    return;
  }

  console.log('MySQL Connected as ID ' + connection.threadId);
});

function prepInsert(data) {
  const workerStats = Object.values(data);
  const statValues = Object.values(workerStats[5]);
  workerStats.splice(5, 1);
  return workerStats.concat(statValues);
}

export function insertStats(stats) {
  connection.query(
    'INSERT INTO `stats`(`workerID`, `worker`, `ip`, `online`, `farm`, `status`, `time`, `code`, `msg`, `description`, `miner`, `compileTime`, `type`, `stats`, `stat_id`, `elapsed`, `calls`, `wait`, `max`, `min`, `GHS5s`, `GHSav`, `rate_30m`, `mode`, `miner_count`, `frequency`, `fan_num`, `fan1`, `fan2`, `fan3`, `fan4`, `temp_num`, `temp1`, `temp2_1`, `temp2`, `temp2_2`, `temp3`, `temp2_3`, `temp_pcb1`, `temp_pcb2`, `temp_pcb3`, `temp_pcb4`, `temp_chip1`, `temp_chip2`, `temp_chip3`, `temp_chip4`, `temp_pic1`, `temp_pic2`, `temp_pic3`, `temp_pic4`, `total_rateideal`, `rate_unit`, `total_freqavg`, `total_acn`, `totalrate`, `temp_max`, `no_matching_work`, `chain_acn1`, `chain_acn2`, `chain_acn3`, `chain_acn4`, `chain_acs1`, `chain_acs2`, `chain_acs3`, `chain_acs4`, `chain_hw1`, `chain_hw2`, `chain_hw3`, `chain_hw4`, `chain_rate1`, `chain_rate2`, `chain_rate3`, `chain_rate4`, `freq1`, `freq2`, `freq3`, `freq4`, `miner_version`, `miner_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [...prepInsert(stats)]
  );
}
