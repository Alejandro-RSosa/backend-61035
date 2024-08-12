import { Router } from 'express';
import logger from '../logger.js';

const router = Router();

router.get('/', (req, res) => {
    logger.debug('Debug message');
    logger.http('HTTP message');
    logger.info('Info message');
    logger.warning('Warning message');
    logger.error('Error message');
    logger.fatal('Fatal message');
    res.send('Logs generados, revisa la consola y el archivo errors.log si estás en producción.');
    });

export default router;